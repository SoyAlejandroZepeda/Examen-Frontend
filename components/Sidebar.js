import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {

    //Routing
    const router = useRouter();

    return ( 
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <Link href="/">
                    <p className="text-white text-2xl font-black text-center cursor-pointer">REACTJS</p>
                </Link>
            </div>

            <nav className="mt-5 list-none">
                <ul className="text-white block text-lg italic">
                    Administración
                    <li className={ router.pathname === "/companies" ? "bg-blue-800 p-2 mt-2" : "p-2 mt-2" }>
                        <Link href="/companies">
                            <a className="text-white block text-sm ml-4 not-italic">
                                Empresas
                            </a>
                        </Link>
                    </li>
                    <li className={ router.pathname === "/departments" ? "bg-blue-800 p-2" : "p-2" }>
                        <Link href="/departments">
                            <a className="text-white block text-sm ml-4 not-italic">
                                Departamentos
                            </a>
                        </Link>
                    </li>
                    <li className={ router.pathname === "/employees" ? "bg-blue-800 p-2" : "p-2" }>
                        <Link href="/employees">
                            <a className="text-white block text-sm ml-4 not-italic">
                                Empleados
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
 
export default Sidebar;