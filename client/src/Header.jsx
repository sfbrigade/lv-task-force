import { useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router';
import { StatusCodes } from 'http-status-codes';
import { Anchor, Avatar, Container, Group, Menu, Text, Title } from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import Api from './Api';
import { useAuthContext } from './AuthContext';

import styles from './Header.module.css';

function Header ({ opened, close, toggle }) {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const queryClient = useQueryClient();

  const { data, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => Api.users.me().then((response) => response.status === StatusCodes.OK ? response.data : null),
  });

  useEffect(
    function () {
      if (isSuccess) {
        setUser(data);
      }
    },
    [data, isSuccess, setUser]
  );

  async function onLogout (event) {
    event.preventDefault();
    await Api.auth.logout();
    queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
    setUser(null);
    close();
    navigate('/');
  }

  return (
    <Container h='100%'>
      <Group h='100%' align='center' justify='space-between'>
        <Link className={styles.home} to='/' onClick={close}>
          <Title className={styles.home__title}>Vehicle Permit Check</Title>
          <Text className={styles.home__subtitle}>A pilot service by SF Civic Tech</Text>
        </Link>
        <Group visibleFrom='sm' gap='xl'>
          {user && (
            <>
              {user.isAdmin && (
                <Menu trigger='hover' transitionProps={{ exitDuration: 0 }} withinPortal>
                  <Menu.Target>
                    <Anchor component={NavLink} to='/admin'>Admin</Anchor>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item><Anchor component={NavLink} to='/admin/invites'>Invites</Anchor></Menu.Item>
                    <Menu.Item><Anchor component={NavLink} to='/admin/users'>Users</Anchor></Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
              <Group gap='xs'>
                <span>
                  Hello,{' '}
                  <Anchor component={NavLink} to='/account' onClick={close}>
                    {user.firstName}!
                  </Anchor>
                </span>
                {user.pictureUrl && <Avatar src={user.pictureUrl} />}
              </Group>
              <Anchor href='/logout' onClick={onLogout}>
                Log out
              </Anchor>
            </>
          )}
        </Group>
      </Group>
    </Container>
  );
}

export default Header;
