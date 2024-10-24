import React from 'react';

const NoticationList = ({notificationListState}) => (
    <div >
        {notificationListState.forEach(element => (
            <div bg='element.status' >
                {element.message}
            </div>
        ))}
    </div>
)