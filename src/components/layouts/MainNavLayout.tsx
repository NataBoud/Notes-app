import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function MainNavLayout() {
    return (
        <>
            <NavBar  />
            <Outlet />
        </>
    )
}
