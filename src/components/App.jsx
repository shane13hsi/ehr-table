import React from 'react/addons';
import {
    Navbar, Brand, DropDownButton, DropDownMenu, NavAvatar, NavbarLeft, NavbarRight
    , Sidebar, SidebarMenuItem
    , MainContainer
    , MainContent
    , PageContent
    } from 'ehr-ace-react';
import TableDemo from './TableDemo';

export default React.createClass({
    displayName: 'App',
    render: function() {
        return (
            <div>
                <Navbar>
                    <div>
                        <Brand name='e-HR Ace React'/>
                        <NavbarLeft>
                            <li>
                                <a href='#/page1'>Page1</a>
                            </li>
                        </NavbarLeft>
                        <NavbarRight>
                            <li className="light-blue">
                                <DropDownButton>
                                    <NavAvatar
                                        imgSrc={require('../../assets/avatars/avatar.png')}
                                        userName={'张三'}/>
                                </DropDownButton>
                                <DropDownMenu>
                                    <li>
                                        <a href={''}>
                                            <i className="ace-icon fa fa-power-off"></i>
                                            登出
                                        </a>
                                    </li>
                                </DropDownMenu>
                            </li>
                        </NavbarRight>
                    </div>
                </Navbar>
                <MainContainer>
                    <div>
                        <Sidebar>
                            <SidebarMenuItem
                                active={true}
                                link={'/#/'}
                                icon='tachometer'
                                text='Dashboard'/>
                        </Sidebar>
                        <MainContent>
                            <PageContent>
                                <TableDemo />
                            </PageContent>
                        </MainContent>
                    </div>
                </MainContainer>
            </div>
        );
    }
});
