const Footer = () => {
  return (
    <footer className="w-full text-center text-gray-800/70 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <p className=" text-sm font-medium p-4">
          © {new Date().getFullYear()} Joint Executive Company (JEC). All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
