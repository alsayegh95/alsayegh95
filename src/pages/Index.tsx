import { DashboardLayout } from "@/components/DashboardLayout";
import { AgentBanner } from "@/components/dashboard/AgentBanner";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TokenUsageChart } from "@/components/dashboard/TokenUsageChart";
import { ActiveTasks } from "@/components/dashboard/ActiveTasks";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Index = () => {
  return (
    <DashboardLayout>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="space-y-4 max-w-[1400px] mx-auto"
      >
        <motion.div variants={fadeUp}>
          <AgentBanner />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div variants={fadeUp}>
            <TodaySchedule />
          </motion.div>
          <motion.div variants={fadeUp}>
            <RecentActivity />
          </motion.div>
          <motion.div variants={fadeUp}>
            <TokenUsageChart />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div variants={fadeUp}>
            <ActiveTasks />
          </motion.div>
          <motion.div variants={fadeUp}>
            <QuickActions />
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Index;
