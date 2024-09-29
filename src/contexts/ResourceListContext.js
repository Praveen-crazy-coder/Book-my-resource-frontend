import React, { createContext, useState, useContext } from 'react';

const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
    const [resourceList, setResourceList] = useState([]);

    return (
        <ResourceContext.Provider value={{ resourceList, setResourceList }}>
            {children}
        </ResourceContext.Provider>
    );
};

export const useResource = () => useContext(ResourceContext);
