import { useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router';
import { StatusCodes } from 'http-status-codes';
import { Anchor, Avatar, Container, Group, Menu, Text, Title } from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IconChevronDown } from '@tabler/icons-react';

import Api from './Api';
import { useAuthContext } from './AuthContext';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.css';

function Header ({ opened, close, toggle }) {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation();

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
    <Container h='100%' py='0'>
      <Group h='100%' align='center' justify='space-between'>
        <Link className={styles.home} to='/' onClick={close}>
          <Title className={styles.home__title}>{t('header.title')}</Title>
          <Text className={styles.home__subtitle}>{t('header.subtitle')}</Text>
        </Link>
        <Group visibleFrom='sm' gap='xl'>
          {user && (
            <>
              {user.isAdmin && (
                <Menu trigger='hover' transitionProps={{ exitDuration: 0 }} withinPortal>
                  <Menu.Target>
                    <Anchor component={NavLink} to='/admin'>{t('header.menu.admin')}</Anchor>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item><Anchor component={NavLink} to='/admin/invites'>{t('header.menu.invites')}</Anchor></Menu.Item>
                    <Menu.Item><Anchor component={NavLink} to='/admin/users'>{t('header.menu.users')}</Anchor></Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
              <Group gap='xs'>
                <span>
                  {t('header.helloPrefix')},{' '}
                  <Anchor component={NavLink} to='/account' onClick={close}>
                    {user.firstName}!
                  </Anchor>
                </span>
                {user.pictureUrl && <Avatar src={user.pictureUrl} />}
              </Group>
              <Anchor href='/logout' onClick={onLogout}>
                {t('header.logout')}
              </Anchor>
            </>
          )}
        </Group>
        <Menu withinPortal>
          <Menu.Target>
            <Text fz='sm' fw='600' style={{ display: 'inline-flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
              {t(`lang.${i18n.resolvedLanguage || 'en'}`)}
              <IconChevronDown size={24} />
            </Text>
          </Menu.Target>
          <Menu.Dropdown>
            {((i18n.options?.supportedLngs ?? [])
              .filter((code) => typeof code === 'string' && code !== 'cimode')
              .map((code) => (
                <Menu.Item key={code} onClick={() => i18n.changeLanguage(code).catch(err => console.error(err))} disabled={i18n.resolvedLanguage === code}>
                  {t(`lang.${code}`)}
                </Menu.Item>
              )))}
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Container>
  );
}

export default Header;
