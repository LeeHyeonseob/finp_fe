import {
    ApertureIcon,
    CopyIcon,
    LayoutDashboardIcon,
    TypographyIcon,
    CurrencyLitecoinIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: 'Home' },
    {
        title: 'Dashboard',
        icon: LayoutDashboardIcon,
        to: '/main/dashboard'
    },
    { header: 'utilities' },
    {
        title: 'Board',
        icon: TypographyIcon,
        to: '/main/board'
    },
    {
        title: 'CoinCharge',
        icon: CopyIcon,
        to: '/main/coinCharge'
    },
    {
        title: 'CoinTransaction',
        icon: CurrencyLitecoinIcon,
        to: '/main/coinTransaction'
    },
];

export default sidebarItem;
