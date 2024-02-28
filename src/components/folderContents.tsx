import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { storageService } from '/Users/ahmadreza/sem2Projects/googledriveclone/src/firebase.js'; 

function FolderContents() {
    const { folderId } = useParams(); 
    const [files, setFiles] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileRef = ref(storageService, `folders/${folderId}/${file.name}`);
        setUploading(true);

        try {
            await uploadBytes(fileRef, file);
            alert('File uploaded successfully');
            fetchFiles(); 
        } catch (error) {
            console.error("Error uploading file: ", error);
            alert('Error uploading file');
        } finally {
            setUploading(false);
        }
    };

    const fetchFiles = useCallback(async () => {
        const filesRef = ref(storageService, `folders/${folderId}`);
        try {
            const snapshot = await listAll(filesRef);
            const filesPromises = snapshot.items.map(item => getDownloadURL(item));
            const filesUrls = await Promise.all(filesPromises);
            setFiles(filesUrls);
        } catch (error) {
            console.error("Error fetching files: ", error);
        }
    }, [folderId]);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    return (
        <div>
            <input type="file" onChange={handleUpload} disabled={uploading} />
            {uploading && <p>Uploading...</p>}
            <div>
                {files.map((url, index) => (
                    <div key={index}>
                        <a href={url} target="_blank" rel="noopener noreferrer">View File</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FolderContents;
