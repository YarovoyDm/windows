import React, { useEffect } from 'react';

import './LockScreen.css';

const LockScreen: React.FC = () => {
    const check = false;

    useEffect(() => {
        document.addEventListener("keydown", function(event) {
            if (event.key === 'Enter') {
                alert('h11i.');
            }
        });

        return () => {
            document.removeEventListener("keydown", function(event) {
                if (event.key === 'Enter') {
                    alert('h11i.');
                }
            });
        };
    }, [check]);

    return (
        <div className='lockScreen'>1</div>
    );
};

export default LockScreen;