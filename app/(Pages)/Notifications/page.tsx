"use client";
import React from 'react';
import { Bell, Package } from 'lucide-react';

type Notification = {
  id: number;
  type: 'event' | 'merchandise';
  message: string;
  date: string;
};

const notifications: Notification[] = [
  {
    id: 1,
    type: 'event',
    message: "You've successfully registered for the Dance Competition on September 20, 2023.",
    date: 'September 1, 2023',
  },
  {
    id: 2,
    type: 'merchandise',
    message: 'Your T-shirt order will be delivered on September 25, 2023.',
    date: 'September 5, 2023',
  },
  {
    id: 3,
    type: 'event',
    message: "Reminder: The Art Workshop you registered for is on October 10, 2023.",
    date: 'September 10, 2023',
  },
];

const NotificationsPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-light mb-8 text-gray-800">Notifications</h1>
      <ul className="space-y-6">
        {notifications.map((notif) => (
          <li key={notif.id} className="bg-white shadow-sm rounded-lg p-4 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-2">
              {notif.type === 'event' ? (
                <Bell className="w-5 h-5 text-blue-500 mr-2" />
              ) : (
                <Package className="w-5 h-5 text-green-500 mr-2" />
              )}
              <span className={`text-sm font-medium ${notif.type === 'event' ? 'text-blue-500' : 'text-green-500'}`}>
                {notif.type === 'event' ? 'Event Update' : 'Merchandise Update'}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{notif.message}</p>
            <span className="text-xs text-gray-400">{notif.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
