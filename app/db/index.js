const select = async (table, params, where = null) => {
    try {
        let rows;
        const response = await fetch(`../../db/data/${table}.json`);
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        const data = await response.json();
        rows = [...data];

        if (where) {
            rows = rows.filter(item => {
                for (let key in where) {
                    if (key === 'name' && typeof item[key] === 'string' && typeof where[key] === 'string') {
                        if (!item[key].toLowerCase().includes(where[key].toLowerCase())) {
                            return false;
                        }
                    } else if (key === "watched_date_range") {
                        let itemDate = new Date(item.watched_date.split("/").reverse().join("-")); // Convierte "DD/MM/YYYY" a "YYYY-MM-DD"
                        let fromDate = where[key].from ? new Date(where[key].from) : null;
                        let toDate = where[key].to ? new Date(where[key].to) : null;
                
                        if ((fromDate && itemDate < fromDate) || (toDate && itemDate > toDate)) {
                            return false;
                        }
                    } else if (item[key] !== where[key]) {
                        return false;
                    }
                }
                return true;
            });
        }

        if (Object.keys(params).length > 0) {
            rows = rows.map(item => {
                const filteredItem = {};
                Object.keys(item).forEach(key => {
                    if (params[key]) {
                        filteredItem[key] = item[key];
                    }
                });
                return filteredItem;
            });
        }
        
        return rows;
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
        return null;
    }
}

const getMovies = async (params, where = null) => await select('movies', params, where);
