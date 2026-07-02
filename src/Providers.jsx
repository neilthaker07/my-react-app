import React, {useState, useEffect} from 'react';

function Providers() {
    const [providerData, setProviderData] = useState(null);
    const [matchedData, setMatchedData] = useState(null);
    // 1. Create state to track what the user is typing
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:8081/api/providers')
            .then((response) => response.json())
            .then((data) => {
                setProviderData(data);
                console.log('Fetched data:', data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        fetch('http://localhost:8081/api/providers/match?date=2026-07-06&preferredAge=40')
            .then((response) => response.json())
            .then((data) => {
                setMatchedData(data);
                console.log('Fetched data:', data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const filteredProvider = providerData?.filter(provider => {
        if (!searchQuery) return true;
        return provider.name.toLowerCase().includes(searchQuery.toLowerCase())
    });

    return (
        <>
            <input type="text" placeholder="Search providers..." onChange={(e) => setSearchQuery(e.target.value)} />
            <div>
                <h1>Providers</h1>
                {filteredProvider && filteredProvider.map(provider => 
                    <div>
                        <p>{provider.id}</p>
                        <p>{provider.name}</p>
                    </div>
                )}
                {/* <h2>Match</h2> */}
                {/* {matchedData?.map((item, index) => (
                    <div key={index} style={{border: '1px solid #ccc', padding: '10px', marginBottom: '10px'}}>
                        <p>Provider ID: {item.providerId}</p>
                        <p>Name: {item.name}</p>
                        <p>Zip: {item.zip}</p>
                        <p>Age: {item.age}</p>
                        <p>Late Appointments: {item.lateAppointments}</p>
                        <p>Client Retention: {item.clientRetention}</p>
                    </div>
                ))} */}
            </div>
        </>
    );
}

export default Providers;