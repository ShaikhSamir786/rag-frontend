'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { documentsApi } from '@/features/documents/api/documentsApi';
import { useDispatch } from 'react-redux';
import { addDocument, setUploadProgress, clearUploadProgress, setUploading } from '@/features/documents/store/documentsSlice';
import { toast } from 'react-hot-toast';

export function DocumentUploader({ onUploadComplete, maxFiles = 5 }) {
    const dispatch = useDispatch();
    const [uploading, setUploadingState] = useState(false);
    const [uploadProgress, setUploadProgressState] = useState({});
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.slice(0, maxFiles - files.length).map((file) => ({
            file,
            id: `temp-${Date.now()}-${Math.random()}`,
            name: file.name,
            size: file.size,
            progress: 0,
        }));
        setFiles((prev) => [...prev, ...newFiles]);
    }, [files.length, maxFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'text/plain': ['.txt'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
        maxSize: 50 * 1024 * 1024, // 50MB
    });

    const removeFile = (fileId) => {
        setFiles((prev) => prev.filter((f) => f.id !== fileId));
        setUploadProgressState((prev) => {
            const newState = { ...prev };
            delete newState[fileId];
            return newState;
        });
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploadingState(true);
        dispatch(setUploading(true));

        try {
            if (files.length === 1) {
                // Single file upload
                const file = files[0];
                const progressCallback = (progress) => {
                    setUploadProgressState((prev) => ({ ...prev, [file.id]: progress }));
                    dispatch(setUploadProgress({ documentId: file.id, progress }));
                };

                const result = await documentsApi.upload(file.file, null, progressCallback);
                dispatch(addDocument(result));
                dispatch(clearUploadProgress(file.id));
                toast.success('Document uploaded successfully');
                onUploadComplete?.(result);
            } else {
                // Batch upload
                const fileList = files.map((f) => f.file);
                const progressCallback = (progress) => {
                    // Distribute progress across files
                    const perFile = progress / files.length;
                    files.forEach((file) => {
                        setUploadProgressState((prev) => ({
                            ...prev,
                            [file.id]: Math.min(perFile * 100, 100),
                        }));
                        dispatch(setUploadProgress({ documentId: file.id, progress: perFile * 100 }));
                    });
                };

                const results = await documentsApi.uploadBatch(fileList, null, progressCallback);
                results.forEach((result) => {
                    dispatch(addDocument(result));
                });
                files.forEach((file) => {
                    dispatch(clearUploadProgress(file.id));
                });
                toast.success(`${results.length} documents uploaded successfully`);
                onUploadComplete?.(results);
            }

            setFiles([]);
        } catch (error) {
            toast.error(error.message || 'Failed to upload documents');
            console.error(error);
        } finally {
            setUploadingState(false);
            dispatch(setUploading(false));
        }
    };

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`
                    border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                    transition-colors
                    ${isDragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-muted-foreground/25 hover:border-primary/50'
                    }
                `}
            >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">
                    {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                </p>
                <p className="text-xs text-muted-foreground">
                    PDF, DOC, DOCX, TXT (max 50MB per file, {maxFiles} files max)
                </p>
            </div>

            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center gap-3 p-3 border rounded-lg"
                        >
                            <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                {uploadProgress[file.id] !== undefined && (
                                    <div className="mt-2">
                                        <Progress value={uploadProgress[file.id]} className="h-2" />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {Math.round(uploadProgress[file.id])}%
                                        </p>
                                    </div>
                                )}
                            </div>
                            {!uploading && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFile(file.id)}
                                    className="flex-shrink-0"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="w-full"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload {files.length} file{files.length > 1 ? 's' : ''}
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}

