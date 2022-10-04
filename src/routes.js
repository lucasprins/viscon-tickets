import { AccessDenied } from "./pages/AccessDenied/AccessDenied";
import { Account } from "./pages/Account/Account";
import { AdminCustomers } from "./pages/Admin/AdminCustomers";
import { AdminMachines } from "./pages/Admin/AdminMachines";
import { AdminSolutions } from "./pages/Admin/AdminSolutions";
import { AdminUsers } from "./pages/Admin/AdminUsers";
import { CreateTicket } from "./pages/CreateTicket/CreateTicket";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Knowledgebase } from "./pages/Knowledgebase/Knowledgebase";
import { Login } from "./pages/Login/Login";
import { Notifications } from "./pages/Notifications/Notifications";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { Playground } from "./pages/Playground/Playground";
import { Ticket } from "./pages/Ticket/Ticket";
import { Tickets } from "./pages/Tickets/Tickets";

export const routes = [
    { path: '/login', name: 'login', component: <Login /> },
    { path: '/', name: 'dashboard', component: <Dashboard /> },
    { path: '/tickets', name: 'tickets', component: <Tickets /> },
    { path: '/tickets/:ticketID', name: 'ticket', component: <Ticket /> },
    { path: '/knowledgebase', name: 'knowledgebase', component: <Knowledgebase /> },
    { path: '/knowledgebase/create-ticket', name: 'create-ticket', component: <CreateTicket /> },
    { path: '/playground', name: 'playground', component: <Playground /> },
    { path: '/admin/users', name: 'notifications', component: <AdminUsers /> },
    { path: '/admin/customers', name: 'notifications', component: <AdminCustomers /> },
    { path: '/admin/machines', name: 'notifications', component: <AdminMachines /> },
    { path: '/admin/solutions', name: 'notifications', component: <AdminSolutions /> },
    { path: '/notifications', name: 'notifications', component: <Notifications /> },
    { path: '/account', name: 'account', component: <Account /> },
    { path: '/access-denied', name: 'access-denied', component: <AccessDenied /> },
    { path: '*', name: 'page-not-found', component: <PageNotFound /> }
];