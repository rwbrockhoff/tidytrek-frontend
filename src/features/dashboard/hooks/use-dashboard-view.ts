import { useContext } from 'react';
import { DashboardViewContext } from '../contexts/dashboard-view-context';

export const useDashboardView = () => useContext(DashboardViewContext);