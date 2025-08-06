import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';

export default function Navigation() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="flex space-x-4">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="text-blue-600 hover:text-blue-800">
            Home
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute bg-white shadow-lg p-4">
            <NavigationMenu.Link asChild>
              <Link href="/">Go to Homepage</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="text-blue-600 hover:text-blue-800">
            About
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute bg-white shadow-lg p-4">
            <NavigationMenu.Link asChild>
              <Link href="/about">Learn About Us</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="text-blue-600 hover:text-blue-800">
            Services
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute bg-white shadow-lg p-4">
            <NavigationMenu.Sub>
              <NavigationMenu.List className="space-y-2">
                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Link href="/services/web-development">Web Development</Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Link href="/services/mobile-development">Mobile Development</Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              </NavigationMenu.List>
              <NavigationMenu.Viewport />
            </NavigationMenu.Sub>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Indicator />
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}
