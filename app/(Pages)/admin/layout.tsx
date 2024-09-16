"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import clsx from 'clsx';
import { useMediaQuery, useTheme } from '@mui/material';

const drawerWidth = 240;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(`/admin${path}`);
    setMobileOpen(false);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/events')}>
            <ListItemText primary="Manage Events" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/registrations')}>
            <ListItemText primary="View Registrations" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/sales')}>
            <ListItemText primary="Monitor Sales" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/reports')}>
            <ListItemText primary="Generate Reports" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/queries')}>
            <ListItemText primary="Handle Queries" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/logout')}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <Button
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </Button>
          )}
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <main
        className={clsx('content', {
          'ml-[240px]': !isMobile,
          'ml-0': isMobile,
        })}
      >
        <Toolbar />
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
