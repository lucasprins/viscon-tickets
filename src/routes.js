import { AccessDenied } from "./pages/AccessDenied/AccessDenied";
import { Account } from "./pages/Account/Account";
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
    { path: '/notifications', name: 'notifications', component: <Notifications /> },
    { path: '/account', name: 'account', component: <Account /> },
    { path: '/access-denied', name: 'access-denied', component: <AccessDenied /> },
    { path: '*', name: 'page-not-found', component: <PageNotFound /> }
]