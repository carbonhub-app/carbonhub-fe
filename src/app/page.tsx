import GsapTest from "@/components/gsap-test";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center justify-center grow">
        <h1 className="text-4xl font-bold mb-8">CarbonHub Dashboard</h1>
        <p className="text-xl mb-8">Welcome to Carbon Trading Platform</p>

        <div className="flex gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>

      <div className="mt-12">
        <GsapTest />
      </div>
    </main>
  );
}
