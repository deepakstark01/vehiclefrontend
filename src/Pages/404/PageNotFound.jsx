
const NotFoundPage = () => {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-8">404</h1>
      <p className="text-xl text-gray-600 mb-4">Oops! Page not found.</p>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for might have been removed or does not exist.</p>
      <button  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Go back to Home</button>
    </div>
  );
};

export default NotFoundPage;
