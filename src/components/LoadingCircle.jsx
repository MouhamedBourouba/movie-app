function LoadingCircle() {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
        </div>
      </div>
    </>
  );
}

export default LoadingCircle
