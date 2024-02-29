import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { storageService } from '/Users/ahmadreza/sem2Projects/googledriveclone/src/firebase.js';

function FolderContents() {
    const { folderId } = useParams();
    const [files, setFiles] = useState<{ url: string; name: string }[]>([]);
    const [uploading, setUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);

    const showModal = (file: File) => {
        setFileToUpload(file);
        setIsModalOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            showModal(file);
        }
    };

    const handleUpload = async () => {
        if (!fileToUpload) return;

        const fileNameToUse = newFileName || fileToUpload.name;
        const fileRef = ref(storageService, `folders/${folderId}/${fileNameToUse}`);
        setUploading(true);

        try {
            await uploadBytes(fileRef, fileToUpload);
            alert('File uploaded successfully');
            fetchFiles(); 
        } catch (error) {
            console.error("Error uploading file: ", error);
            alert('Error uploading file');
        } finally {
            setIsModalOpen(false);
            setUploading(false);
            setNewFileName('');
            setFileToUpload(null);
        }
    };

    const fetchFiles = useCallback(async () => {
        const filesRef = ref(storageService, `folders/${folderId}`);
        try {
            const snapshot = await listAll(filesRef);
            const filesData = await Promise.all(snapshot.items.map(async item => {
                const url = await getDownloadURL(item);
                return { url, name: item.name }; 
            }));
            setFiles(filesData);
        } catch (error) {
            console.error("Error fetching files: ", error);
        }
    }, [folderId]);

    useEffect(() => {
        fetchFiles(); 
    }, [fetchFiles]);

    return (
        <div>
            <input type="file" onChange={handleFileChange} disabled={uploading} />
            {uploading && <p>Uploading...</p>}
            {isModalOpen && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter new file name"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                    />
                    <button onClick={handleUpload}>Upload File</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
            )}
            <div>
                {files.map((file, index) => (
                    <div key={index}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FolderContents;
