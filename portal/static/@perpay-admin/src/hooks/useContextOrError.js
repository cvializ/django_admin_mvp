
export const useContextOrError = (Context) => {
    const context = useContext(Context);
    if (context === null) {
        throw new Error('Context used outside provider');
    }
    return context;
};
