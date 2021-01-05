export async function parseErrors(data) {
    let response = {};
    await Object.keys(data).map((prop) => {
        const message = data[prop];
        const keys = [...prop.matchAll(/^(\w+)\[(\w+)\]/gi)];
        if (keys.length > 0) {
            response = {
                ... response,
                [keys[0][1]]: {
                    ... response[keys[0][1]],
                    [keys[0][2]]: message
                }
            }
        }else{
            response= {
                ... response,
                [prop]: message
            }
        }
    });
    return response;
}