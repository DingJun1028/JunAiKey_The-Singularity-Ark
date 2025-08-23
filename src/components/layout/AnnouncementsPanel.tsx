
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useJunAiKeyData } from '../../hooks/useJunAiKeyData';
import Button from '../ui/Button';
import { SparklesIcon, InformationCircleIcon, ExclamationTriangleIcon, SanctumIcon } from '../ui/Icons';
import type { Announcement } from '../../types';

interface AnnouncementsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnnouncementIcon: React.FC<{ icon: Announcement['icon'] }> = ({ icon }) => {
    const iconMap = {
        success: <SparklesIcon className="h-6 w-6 text-success" />,
        info: <InformationCircleIcon className="h-6 w-6 text-secondary" />,
        warning: <ExclamationTriangleIcon className="h-6 w-6 text-accent" />,
        system: <SanctumIcon className="h-6 w-6 text-primary" />,
    };
    return iconMap[icon];
};

function formatDistanceToNow(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

const AnnouncementsPanel: React.FC<AnnouncementsPanelProps> = ({ isOpen, onClose }) => {
    const { announcements, lastCheckedAnnouncements, markAllAnnouncementsAsRead } = useJunAiKeyData();
    const navigate = useNavigate();

    const handleItemClick = (item: Announcement) => {
        if (item.href) {
            navigate(item.href);
        }
        onClose();
    };

    const handleMarkAllAsRead = (e: React.MouseEvent) => {
        e.stopPropagation();
        markAllAnnouncementsAsRead();
    };
    
    const sortedAnnouncements = [...announcements].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <AnimatePresence>
            {isOpen && (
                 <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="fixed top-20 right-6 w-[90vw] max-w-md bg-card border border-border rounded-2xl shadow-2xl z-40 overflow-hidden"
                    >
                        <div className="p-4 flex justify-between items-center border-b border-border">
                            <h3 className="font-bold text-lg text-card-foreground">Announcements</h3>
                            <Button variant="ghost" onClick={handleMarkAllAsRead}>Mark all as read</Button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto">
                            {sortedAnnouncements.length > 0 ? (
                                <ul className="divide-y divide-border">
                                    {sortedAnnouncements.map(item => {
                                        const isUnread = new Date(item.timestamp) > new Date(lastCheckedAnnouncements);
                                        return (
                                            <li key={item.id}>
                                                <a
                                                    href={item.href || '#'}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleItemClick(item);
                                                    }}
                                                    className={`block p-4 hover:bg-foreground/5 transition-colors ${isUnread ? 'bg-primary/5' : ''}`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="mt-1"><AnnouncementIcon icon={item.icon} /></div>
                                                        <div className="flex-grow">
                                                            <p className="font-semibold text-card-foreground">{item.title}</p>
                                                            <p className="text-sm text-card-foreground/70">{item.description}</p>
                                                            <p className="text-xs text-card-foreground/50 mt-1">{formatDistanceToNow(item.timestamp)}</p>
                                                        </div>
                                                        {isUnread && <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                                                    </div>
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <div className="p-8 text-center text-card-foreground/60">
                                    <p>No announcements yet.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AnnouncementsPanel;
