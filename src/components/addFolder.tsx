import React, { useState, useEffect } from 'react';
import './styles/addFolder.css';
import { database } from '/Users/ahmadreza/sem2Projects/googledriveclone/src/firebase.js';
import { addDoc, query, onSnapshot, CollectionReference, DocumentData, where } from 'firebase/firestore'; 
import { useUserAuth } from "../context/UserAuthContext";

interface Folder {
    id: string;
    name?: string;
    createdBy?: string;
}

function AddFolder() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [folderName, setFolderName] = useState<string>('');
    const [folders, setFolders] = useState<Folder[]>([]);
    const { user } = useUserAuth();

    useEffect(() => {
        if (user) {
            const q = query(database.folders as CollectionReference<DocumentData>, where("createdBy", "==", user.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const foldersArray: Folder[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }) as Folder);
                setFolders(foldersArray);
            });
            return () => unsubscribe(); 
        }
    }, [user]); 

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFolderName(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            console.error("No user logged in");
            return;
        }
        try {
            const folderData = { 
                name: folderName, 
                createdBy: user.uid 
            };
            await addDoc(database.folders as CollectionReference<DocumentData>, folderData);
            closeModal();
        } catch (error) {
            console.error("Error adding folder: ", error);
        }
        setFolderName('');
    };

    return (
        <div>
            <div className="folder-button">
                <button onClick={openModal}>Add Folder</button>
                {modalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="folderName">Folder Name</label>
                                    <input
                                        type="text"
                                        id="folderName"
                                        name="folderName"
                                        required
                                        value={folderName}
                                        onChange={handleNameChange}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div className="folders-display">
                {folders.map(folder => (
                    <div key={folder.id} className="folder">
                        <span>{folder.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddFolder;
