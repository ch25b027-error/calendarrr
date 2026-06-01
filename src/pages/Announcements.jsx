const Announcements = () => {
    return ( 
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Announcements</h1>
            <div className="bg-white shadow rounded p-4 mb-4">
                <h2 className="text-xl font-semibold">Company Picnic</h2>
                <p className="text-gray-600">Join us for a fun day at the park on Saturday, June 15th!</p>
            </div>
            <div className="bg-white shadow rounded p-4 mb-4">
                <h2 className="text-xl font-semibold">New HR Policies</h2>
                <p className="text-gray-600">Please review the updated HR policies in the employee handbook.</p>
            </div>
        </div>
     );
}
 
export default Announcements;