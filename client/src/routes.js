import { AccessDenied } from "./components/pages/AccessDenied/AccessDenied";
import { Account } from "./components/pages/Account/Account";
import { AdminCustomers } from "./components/pages/Admin/AdminCustomers";
import { AdminMachines } from "./components/pages/Admin/AdminMachines";
import { AdminSolutions } from "./components/pages/Admin/AdminSolutions";
import { AdminUsers } from "./components/pages/Admin/AdminUsers";
import { CreateTicket } from "./components/pages/CreateTicket/CreateTicket";
import { Dashboard } from "./components/pages/Dashboard/Dashboard";
import { Knowledgebase } from "./components/pages/Knowledgebase/Knowledgebase";
import { Login } from "./components/pages/Login/Login";
import { Notifications } from "./components/pages/Notifications/Notifications";
import { PageNotFound } from "./components/pages/PageNotFound/PageNotFound";
import { Playground } from "./components/pages/Playground/Playground";
import { Ticket } from "./components/pages/Ticket/Ticket";
import { Tickets } from "./components/pages/Tickets/Tickets";

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