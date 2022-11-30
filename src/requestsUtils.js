export function addNewLog(userName, action) {
    fetch(`http://localhost:5000/api/addNewLog?userName=${userName}&action=${action}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => {
            return res.json()
        })
        .then(
            (result) => {
            },
            (error) => {
                console.log('error', error);
            }
        )

}