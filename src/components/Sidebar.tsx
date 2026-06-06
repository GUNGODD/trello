'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faCalendar, 
  faFileLines, 
  faChartBar, 
  faEye, 
  faClock, 
  faFolder, 
  faStar, 
  faLightbulb,
  faChevronDown,
  faChevronRight,
  faPlus,
  faBolt
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState } from 'react';

interface WorkspaceItem {
  id: string;
  name: string;
  icon: any;
  count?: number;
  children?: WorkspaceItem[];
  active?: boolean;
}

const workspaceItems: WorkspaceItem[] = [
  {
    id: 'sales-crm',
    name: 'Sales CRM',
    icon: faFolder,
    count: 0,
  },
  {
    id: 'dashboard-crm',
    name: 'Dashboard CRM',
    icon: faFolder,
    active: true,
    children: [
      { id: 'task', name: 'Task', icon: faFileLines, count: 20 },
      { id: 'calendar', name: 'Calendar', icon: faCalendar, count: 27 },
      { id: 'notes', name: 'Notes', icon: faFileLines, count: 10 },
      { id: 'report', name: 'Report', icon: faChartBar, count: 18 },
      { id: 'view', name: 'View', icon: faEye },
      { id: 'timeline', name: 'Timeline', icon: faClock },
    ],
  },
  {
    id: 'project-mgmt',
    name: 'Project Management',
    icon: faFolder,
  },
  {
    id: 'dashboard-saas',
    name: 'Dashboard SaaS',
    icon: faFolder,
  },
  {
    id: 'hr-payroll',
    name: 'HR Payroll',
    icon: faFolder,
  },
  {
    id: 'job-screening',
    name: 'Job Screening',
    icon: faFolder,
  },
];

export function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard-crm']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-64 bg-white dark:bg-[#1a1a2e] border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <FontAwesomeIcon icon={faBolt} className="text-white text-sm" />
          </div>
          <span className="font-bold text-gray-900 dark:text-white">Project Inc.</span>
          <span className="ml-auto text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full font-medium">
            PRO
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <FontAwesomeIcon icon={faHome} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-12 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Workspace */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Workspace</span>
          <div className="flex gap-1">
            <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
              <FontAwesomeIcon icon={faPlus} className="text-xs" />
            </button>
            <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
              <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
            </button>
          </div>
        </div>

        <nav className="space-y-1">
          {workspaceItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => item.children && toggleExpand(item.id)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                  item.active 
                    ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.children && (
                  <FontAwesomeIcon 
                    icon={expandedItems.includes(item.id) ? faChevronDown : faChevronRight} 
                    className="text-xs text-gray-400 w-3"
                  />
                )}
                {!item.children && <span className="w-3" />}
                <FontAwesomeIcon icon={item.icon} className="text-xs w-4" />
                <span className="flex-1 text-left truncate">{item.name}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-xs text-gray-400">{item.count}</span>
                )}
                {item.id === 'sales-crm' && (
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                )}
              </button>

              {/* Children */}
              <AnimatePresence>
                {item.children && expandedItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={`/boards/${child.id}`}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                            child.id === 'task'
                              ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <FontAwesomeIcon icon={child.icon} className="text-xs w-4" />
                          <span className="flex-1 text-left truncate">{child.name}</span>
                          {child.count !== undefined && (
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">{child.count}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Recent, Starred, Templates */}
        <div className="mt-6 space-y-3">
          {['Recent', 'Starred', 'Templates'].map((section) => (
            <div key={section}>
              <button className="w-full flex items-center justify-between px-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <span className="font-medium">{section}</span>
                <FontAwesomeIcon icon={faChevronDown} className="text-xs text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
