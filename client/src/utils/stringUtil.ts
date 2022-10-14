export const getInitials = (name: string): string  => {
    const parts: string[] = name.split(" ");
    console.log(parts);
    let initials: string = "";
    for (var i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== "") {
            initials += parts[i][0];
        }
    }
    return initials;
};
