'use client'

import { createNewClass } from "@/connection/classAPI";

const CreatePage = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault(); 
        
        try {
            createNewClass(e.currentTarget["classname"].value)
        } catch (error) {
            console.error(error);
        }
        
    };

    return (
        <div className="flex flex-col content-center p-10 space-y-6">
            <h1 className="text-center">Create Page</h1>
            <form className="flex flex-col content-center space-y-6" onSubmit={handleSubmit}>
                <label htmlFor="class-name">Class Name</label>
                <input type="text" id="classname" name="classname" />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreatePage;