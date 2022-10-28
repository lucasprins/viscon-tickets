import { AccessDenied } from "./components/pages/AccessDenied/AccessDenied";
import { Account } from "./components/pages/Account/Account";
import { AdminCustomers } from "./components/pages/Admin/AdminCustomers";
import { AdminMachines } from "./components/pages/Admin/AdminMachines";
import { AdminSolutions } from "./components/pages/Admin/AdminSolutions";
import { AdminUsers } from "./components/pages/Admin/AdminUsers";
import { CreateTicket } from "./components/pages/CreateTicket/CreateTicket";
import { Dashboard } from "./components/pages/Dashboard/Dashboard";
import { Knowledgebase } from "./components/pages/Knowledgebase/Knowledgebase";
import { Login } from "./components/pages/Authentication/Login";
import { Notifications } from "./components/pages/Notifications/Notifications";
import { PageNotFound } from "./components/pages/PageNotFound/PageNotFound";
import { Ticket } from "./components/pages/Ticket/Ticket";
import { Tickets } from "./components/pages/Tickets/Tickets";
import { ForgotPassword } from "./components/pages/Authentication/ForgotPassword";
import { NewPassword } from "./components/pages/Authentication/NewPassword";
import { Register } from "./components/pages/Authentication/Register";
import { RegisterCompleted } from "./components/pages/Authentication/RegisterCompleted";
import { TicketNotFound } from "./components/pages/TicketNotFound/TicketNotFound";

export const routes = [
    { path: '/login', name: 'login', component: <Login /> },
    { path: '/forgot-password', name: 'access-denied', component: <ForgotPassword /> },
    { path: '/new-password', name: 'access-denied', component: <NewPassword /> },
    { path: '/register', name: 'access-denied', component: <Register /> },
    { path: '/register-completed', name: 'access-denied', component: <RegisterCompleted /> },
    { path: '/', name: 'dashboard', component: <Dashboard /> },
    { path: '/tickets', name: 'tickets', component: <Tickets /> },
    { path: '/tickets/:ticketID', name: 'ticket', component: <Ticket /> },
    { path: '/knowledgebase', name: 'knowledgebase', component: <Knowledgebase /> },
    { path: '/knowledgebase/create-ticket', name: 'create-ticket', component: <CreateTicket /> },
    { path: '/admin/users', name: 'notifications', component: <AdminUsers /> },
    { path: '/admin/customers', name: 'notifications', component: <AdminCustomers /> },
    { path: '/admin/machines', name: 'notifications', component: <AdminMachines /> },
    { path: '/admin/solutions', name: 'notifications', component: <AdminSolutions /> },
    { path: '/notifications', name: 'notifications', component: <Notifications /> },
    { path: '/account', name: 'account', component: <Account /> },
    { path: '/access-denied', name: 'access-denied', component: <AccessDenied /> },
    { path: '/ticket-not-found', name: 'ticket-not-found', component: <TicketNotFound /> },
    { path: '*', name: 'page-not-found', component: <PageNotFound /> }
];