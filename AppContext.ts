import React from "react";

// defining the context
const context = {
// in our context we need to save the song id --> whenever we press we need to set that song id in our context --> using setSongId() func
    songId: null,
    setSongId: (id) => {}
}

export const AppContext = React.createContext(context);

// we need to provide this context to our application --> App.tsx