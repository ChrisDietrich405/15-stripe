import React, { useState, useContext, createContext } from "react";
import sublinks from "./data";

interface ILocation {
  center: number;
  bottom: number;
}

interface ILink {
  label: string;
  icon: JSX.Element;
  url: string;
}

export interface IPage {
  page: string;
  links: ILink[];
}

interface IAppContext {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  isSubmenuOpen: boolean;
  openSubmenu: (text: string, coordinates: ILocation) => void;
  closeSubmenu: () => void;
  page: IPage;
  location: ILocation;
}

interface AppProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

const AppProvider = ({ children }: AppProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);
  const [page, setPage] = useState<IPage>({ page: "", links: [] });
  const [location, setLocation] = useState<ILocation>({} as ILocation);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSubmenu = (text: string, coordinates: ILocation) => {
    const page = sublinks.find((link) => link.page === text);
    if (page) {
      setPage(page);
      setLocation(coordinates);
      setIsSubmenuOpen(true);
    }
  };

  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        page,
        location,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): IAppContext => {
  return useContext<IAppContext>(AppContext);
};

export { AppContext, AppProvider };
