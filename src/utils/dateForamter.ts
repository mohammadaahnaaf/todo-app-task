
export const formattedDateTime = (dnt: any) => {
    const inputDate = new Date(dnt);
    return inputDate.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
        // timeZoneName: "short",
    })
}
console.log(formattedDateTime);