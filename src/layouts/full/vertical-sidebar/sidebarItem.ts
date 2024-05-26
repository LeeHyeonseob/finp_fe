import {
    ApertureIcon,
    CopyIcon,
    LayoutDashboardIcon,
    LoginIcon,
    MoodHappyIcon,
    TypographyIcon,
    UserPlusIcon,
    CurrencyLitecoinIcon // 추가된 아이콘
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
        to: '/'
    },
    { header: 'utilities' },
    {
        title: 'Board',
        icon: TypographyIcon,
        to: '/ui/board'
    },
    {
        title: 'CoinCharge',
        icon: CopyIcon,
        to: '/ui/coinCharge'
    },
    {
        title: 'CoinTransaction',
        icon: CurrencyLitecoinIcon,
        to: '/ui/coinTransaction'
    },
];

export default sidebarItem;

