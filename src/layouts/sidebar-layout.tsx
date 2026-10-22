import { type ReactNode, ViewTransition } from "react";

import { cn } from "cn";
import {
  LayoutDashboardIcon,
  FolderIcon,
  MoreHorizontalIcon,
  SearchIcon,
  FilePlusCorner,
  CogIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import { create_process_list } from "@/routes/create";
import ThemeSwitcher from "@/components/theme-switch";
import { useTheme } from "@/providers/theme-provider";

interface Workspace {
  id: string;
  name: string;
  plan: string;
  initials: string;
  avatar: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  to?: string;
  items?: NavItem[];
}

// Demo data only: every link is `href="#"` and the faces come from the fixed
// set of photo ids this registry already ships, so nothing here reaches a real
// person, a real route or an invented endpoint.
const WORKSPACES: Workspace[] = [
  {
    id: "reui-labs",
    name: "ReUI Labs",
    plan: "Pro",
    initials: "RL",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
  },
];

const MAIN_NAV: NavItem[] = [
  {
    id: "search",
    label: "Search",
    to: "/search",
    icon: <SearchIcon aria-hidden="true" />,
  },
  {
    id: "tickets",
    label: "Tickets",
    to: "/tickets",
    icon: <LayoutDashboardIcon aria-hidden="true" />,
  },
  {
    id: "create",
    label: "Create",
    to: "/create",
    icon: <FilePlusCorner aria-hidden="true" />,
    items: create_process_list,
  },
];

const PROJECTS = [
  { id: "checkout", name: "Checkout API" },
  { id: "design-system", name: "Design system" },
  { id: "marketing", name: "Marketing site" },
  { id: "edge-cache", name: "Edge cache" },
];

// The ReUI mark, the same path data the App Shell Pro blocks use. An inline
// SVG on `currentColor` rather than an <img> or an icon-package import: it
// ships inside the example, needs no asset and recolours with the panel.
function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground",
        className,
      )}
    >
      <svg
        viewBox="25.5002 25.1352 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-3"
      >
        <circle cx="70.634" cy="29.8334" r="4.69799" fill="currentColor" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.668 57.0144V29.8332C25.668 27.2386 27.7713 25.1352 30.366 25.1352C32.9606 25.1352 35.0639 27.2386 35.0639 29.8332V57.0144C35.0639 61.833 38.9702 65.7392 43.7888 65.7392H57.2116C62.0302 65.7392 65.9364 61.833 65.9364 57.0144V43.7258C65.9364 41.1312 68.0398 39.0278 70.6344 39.0278C73.229 39.0278 75.3324 41.1312 75.3324 43.7258V57.0144C75.3324 67.0222 67.2194 75.1352 57.2116 75.1352H43.7888C33.7809 75.1352 25.668 67.0222 25.668 57.0144Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
function AppLogo() {
  const workspace = WORKSPACES[0];
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm">
        <BrandMark className="size-8 rounded-lg [&>svg]:size-4" />
        <span className="grid min-w-0 flex-1 text-left leading-tight">
          <span className="truncate text-sm font-medium">{workspace.name}</span>
          <span className="truncate text-xs text-sidebar-foreground/70">
            {workspace.plan} plan
          </span>
        </span>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function MainNavigation() {
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {MAIN_NAV.map((item) => {
            const isActive = location.href.includes(item.to!);

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  render={<Link to={item.to} />}
                  isActive={isActive}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </SidebarMenuButton>
                {item.items?.length && (
                  <ViewTransition name="create">
                    {isActive && (
                      <SidebarMenuSub className="me-0 pe-0">
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            <SidebarMenuSubButton
                              render={<Link to={subItem.to} />}
                            >
                              {subItem?.icon}
                              {subItem.label}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </ViewTransition>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

// TODO: Implement fixes
function RecentNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recent tickets</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {PROJECTS.map((project) => (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton render={<Link to="/" href={project.id} />}>
                <FolderIcon aria-hidden="true" />
                <span>{project.name}</span>
              </SidebarMenuButton>
              <SidebarMenuAction
                showOnHover
                aria-label={`Actions for ${project.name}`}
                title="remove"
                onClick={() => console.log("remove")}
              >
                <MoreHorizontalIcon aria-hidden="true" />
              </SidebarMenuAction>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function AccountMenu() {
  const { theme } = useTheme();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="aria-expanded:bg-sidebar-accent aria-expanded:text-sidebar-accent-foreground"
              />
            }
          >
            <Avatar>
              <AvatarImage src="" alt="" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="grid min-w-0 flex-1 text-left leading-tight">
              <span className="truncate text-sm font-medium">User Name</span>
              <span className="truncate text-xs text-sidebar-foreground/70">
                user.name@henkel.com
              </span>
            </span>
            <MoreHorizontalIcon
              className="ml-auto opacity-60"
              aria-hidden="true"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="max-w-fit">
            <DropdownMenuGroup>
              <DropdownMenuLabel>User Name</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem render={<Link to="/settings" />}>
                <CogIcon aria-hidden="true" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Theme {theme}</DropdownMenuLabel>

              <div className="flex justify-center">
                <ThemeSwitcher />
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function InsetHeader() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      {/* BreadCrumbs */}
      <Breadcrumb className="min-w-0">
        <BreadcrumbList className="flex-nowrap">
          <BreadcrumbItem className="min-w-0">
            <BreadcrumbLink href="#" className="truncate">
              {WORKSPACES[0].name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Deployments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Global Search */}
      <Button variant="outline" size="sm" className="ml-auto">
        Invite
      </Button>
    </header>
  );
}
export function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider className="relative h-dvh min-h-0 w-full overflow-hidden">
      <Sidebar variant="inset" className="absolute h-full">
        <SidebarHeader>
          <AppLogo />
        </SidebarHeader>

        <SidebarContent role="navigation" aria-label="Workspace">
          <MainNavigation />

          {/* <RecentNavigation /> */}
        </SidebarContent>

        <SidebarFooter>
          <SidebarSeparator className="mx-0" />
          <AccountMenu />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0 overflow-hidden">
        <InsetHeader />
        {/* Content */}
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
