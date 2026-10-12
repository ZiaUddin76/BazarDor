"use client"
import React, { useEffect, useState } from 'react';

const DateDisplay = () => {

    const [date, SetDate] = useState("");

    useEffect(() => {
        SetDate(
            new Date().toLocaleDateString("bn-BD", {
                dateStyle: "full",
            })
        );
    }, []);

    return (
        <p> {date} </p>
    );
};

export default DateDisplay;