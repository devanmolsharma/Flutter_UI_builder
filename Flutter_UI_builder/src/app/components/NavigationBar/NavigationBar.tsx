import config from "@/app/config";
import { Container, NavDropdown, Navbar } from "react-bootstrap";

export default function NavigationBar() {
  return (
    <nav className="bg-gray-900 p-4">
    <div className="container mx-auto">
      <a href="#" className="navbar-brand"></a>
      <div className="relative">
      <button className="text-white bg-orange-600 p-2 rounded focus:outline-none" onClick={() => {
        const dropdown = document.getElementById('build-dropdown');
        dropdown!.classList.toggle('hidden');
      }}>
        Download
      </button>
      <ul id="build-dropdown" className="absolute hidden bg-white rounded shadow-md py-2 mt-1 w-32 z-20">
        <li>
          <a href="#" onClick={() => { location.href = config.host + ":8080/build/apk"; }} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Apk</a>
        </li>
        <li>
          <a href="#" onClick={() => { location.href = config.host + ":8080/build/aab"; }} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Aab</a>
        </li>
        <li>
          <a href="#" onClick={() => { location.href = config.host + ":8080/build/linux"; }} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Linux</a>
        </li>
        <li>
          <a href="#" onClick={() => { location.href = config.host + ":8080/build/web"; }} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Web</a>
        </li>
      </ul>
      </div>
    </div>
  </nav>
  
  );
}
