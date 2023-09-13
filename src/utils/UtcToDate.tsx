import React from "react";

function ConvertUnixTime(unixTime: string, phrase: string) {
        const a = new Date(unixTime * 1000);
        const time = a.getHours() + ':' + a.getMinutes();
        return <p className={"card-text"}>{phrase}: {time}</p>
    }

export default ConvertUnixTime;