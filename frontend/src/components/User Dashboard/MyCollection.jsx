import React, { useState, useEffect } from "react";
import axios from 'axios';
import Loading from '../../components/User Dashboard/Loading';


const Card = ({ image, title }) => {

    const base64String = btoa(
        String.fromCharCode(...new Uint8Array(image.data.data))
    );

    return (
        <div className="bg-[#f5f0eb] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img src={`data:image/png;base64,${base64String}`} alt={title} className="w-full h-64 object-cover" />
            <div className="p-4">
                <h2 className="text-[#804f0e] text-xl font-bold">{title}</h2>
            </div>
        </div>
    );

};

const MyCollection = () => {

    const [fetchArray, setFetchArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/individual/getCollection');
                const resdata = await res.data;
                setFetchArray(resdata);
                setLoading(false)

            } catch (error) {
                console.log('Main Error', error);
            }

        };

        fetchData();

    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center text-[#804f0e] text-3xl font-bold mb-8">My Collection</h1>

            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {fetchArray.map((item, index) => (
                        <Card key={index} image={item.image1} title={item.name} />
                    ))}
                </div>
            )}

            {loading && (
                <Loading />
            )}

        </div>
    );

};

export default MyCollection;
