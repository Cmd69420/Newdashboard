import React from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  TrendingUp, TrendingDown, Users, Activity, MapPin, Target, Clock,
  AlertCircle, Award, AlertTriangle, CheckCircle, Sparkles
} from "lucide-react";

// Vision UI Dashboard React components - UPDATED PATHS
import VuiBox from "../components/VuiBox";
import VuiTypography from "../components/VuiTypography";
import VuiBadge from "../components/VuiBadge";
import GradientBorder from "../examples/GradientBorder";
import { Card, Grid, Icon } from "@mui/material";
import linearGradient from "../assets/theme/functions/linearGradient";
import colors from "../assets/theme/base/colors";

const { gradients } = colors;

// Main Stat Card Component
const StatCard = ({ title, value, change, isPositive, icon: Icon, gradient, onClick }) => (
  <Card 
    onClick={onClick}
    sx={{ 
      height: "100%", 
      cursor: onClick ? "pointer" : "default",
      transition: "transform 0.2s",
      "&:hover": onClick ? { transform: "scale(1.02)" } : {}
    }}
  >
    <VuiBox display="flex" flexDirection="column" height="100%">
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="18px">
        <VuiBox>
          <VuiTypography 
            variant="caption" 
            color="text" 
            fontWeight="medium"
            textTransform="uppercase"
            letterSpacing="1px"
          >
            {title}
          </VuiTypography>
          <VuiTypography variant="h2" color="white" fontWeight="bold" mt="4px">
            {typeof value === "number" ? value.toLocaleString() : value}
          </VuiTypography>
        </VuiBox>
        
        <VuiBox
          sx={{
            background: linearGradient(gradient.main, gradient.state),
            width: "60px",
            height: "60px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: `0 8px 24px ${gradient.main}40`,
          }}
        >
          <Icon size={28} color="white" />
        </VuiBox>
      </VuiBox>

      {change !== undefined && (
        <VuiBox display="flex" alignItems="center" gap="4px">
          {isPositive ? (
            <Icon component={TrendingUp} sx={{ color: "#01B574", fontSize: "16px" }} />
          ) : (
            <Icon component={TrendingDown} sx={{ color: "#E31A1A", fontSize: "16px" }} />
          )}
          <VuiTypography variant="button" fontWeight="bold" color={isPositive ? "success" : "error"}>
            {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'}
          </VuiTypography>
        </VuiBox>
      )}
    </VuiBox>
  </Card>
);

// Compact Insight Card
const InsightCard = ({ icon: Icon, gradient, title, value, subtitle, onClick }) => (
  <Card 
    onClick={onClick}
    sx={{ 
      height: "100%",
      cursor: onClick ? "pointer" : "default",
      transition: "all 0.2s",
      "&:hover": onClick ? { transform: "scale(1.03)" } : {}
    }}
  >
    <VuiBox display="flex" alignItems="center" gap="12px">
      <VuiBox
        sx={{
          background: linearGradient(gradient.main, gradient.state),
          width: "48px",
          height: "48px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
          boxShadow: `0 4px 12px ${gradient.main}30`,
        }}
      >
        <Icon size={22} color="white" />
      </VuiBox>
      
      <VuiBox flex="1" minWidth="0">
        <VuiTypography 
          variant="xxs" 
          color="text" 
          fontWeight="bold"
          textTransform="uppercase"
          sx={{ opacity: 0.7 }}
        >
          {title}
        </VuiTypography>
        <VuiTypography variant="h4" color="white" fontWeight="bold">
          {value}
        </VuiTypography>
        {subtitle && (
          <VuiTypography variant="caption" color="text" sx={{ opacity: 0.6 }}>
            {subtitle}
          </VuiTypography>
        )}
      </VuiBox>
    </VuiBox>
  </Card>
);

const AnalyticsPage = ({
  analyticsData,
  syncStatus,
  onRefresh,
  onGoToClients,
  onGoToUsers,
  onSelectUser,
}) => {
  if (!analyticsData) return null;
  
  const { stats, trends, distribution } = analyticsData;

  const conversionRate = stats.totalClients > 0
    ? ((stats.activeClients / stats.totalClients) * 100).toFixed(1)
    : "0.0";
  const clientsPerArea = stats.uniquePincodes > 0 
    ? Math.round(stats.totalClients / stats.uniquePincodes) 
    : 0;
  
  const lastMonth = trends?.[trends.length - 1]?.clients ?? 0;
  const prevMonth = trends?.[trends.length - 2]?.clients ?? 0;
  const growth = prevMonth > 0 
    ? (((lastMonth - prevMonth) / prevMonth) * 100).toFixed(1) 
    : 0;

  const clientStatusData = [
    { name: 'Active', value: stats.activeClients, color: '#01B574' },
    { name: 'Inactive', value: stats.totalClients - stats.activeClients, color: '#E31A1A' }
  ];

  const gpsStatusData = [
    { name: 'With GPS', value: stats.withCoordinates, color: '#0075FF' },
    { name: 'Missing GPS', value: stats.totalClients - stats.withCoordinates, color: '#FFB547' }
  ];

  const topAreasData = Array.isArray(distribution) ? distribution.slice(0, 5) : [];
  const userLeaderboard = Array.isArray(analyticsData.leaderboard) ? analyticsData.leaderboard : [];

  const inactiveCount = stats.totalClients - stats.activeClients;
  const missingGPS = stats.totalClients - stats.withCoordinates;
  
  const actionItems = [
    {
      icon: AlertTriangle,
      color: '#E31A1A',
      gradient: gradients.error,
      title: `${inactiveCount} clients inactive >30 days`,
      action: 'Review engagement strategy',
      show: inactiveCount > 0
    },
    {
      icon: MapPin,
      color: '#FFB547',
      gradient: gradients.warning,
      title: `${missingGPS} clients missing GPS`,
      action: 'Schedule geocoding batch',
      show: missingGPS > 0
    },
    {
      icon: CheckCircle,
      color: '#01B574',
      gradient: gradients.success,
      title: `${stats.coordinatesCoverage}% GPS coverage`,
      action: stats.coordinatesCoverage > 80 ? 'Excellent coverage!' : 'Needs improvement',
      show: true
    }
  ].filter(item => item.show);

  return (
    <VuiBox py={3}>
      {/* Header */}
      <VuiBox mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <VuiBox>
          <VuiTypography variant="h2" color="white" fontWeight="bold" mb="4px">
            Analytics
          </VuiTypography>
          <VuiTypography variant="button" color="text">
            GeoTrack Performance Dashboard
          </VuiTypography>
        </VuiBox>
        
        <VuiBox display="flex" alignItems="center" gap="8px">
          <Sparkles size={18} color="#0BC5EA" />
          <VuiTypography variant="button" color="text">
            Live Data
          </VuiTypography>
        </VuiBox>
      </VuiBox>

      {/* Key Metrics */}
      <VuiBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <StatCard
              title="Total Clients"
              value={stats.totalClients}
              change={parseFloat(growth)}
              isPositive={growth > 0}
              icon={Users}
              gradient={gradients.info}
              onClick={onGoToClients}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <StatCard
              title="Active Rate"
              value={`${conversionRate}%`}
              change={2.3}
              isPositive={true}
              icon={Activity}
              gradient={gradients.success}
              onClick={onGoToClients}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <StatCard
              title="GPS Coverage"
              value={`${stats.coordinatesCoverage}%`}
              change={5.1}
              isPositive={true}
              icon={MapPin}
              gradient={gradients.info}
              onClick={onGoToClients}
            />
          </Grid>
        </Grid>
      </VuiBox>

      {/* Insight Cards */}
      <VuiBox mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4} lg={2}>
            <InsightCard
              icon={Users}
              gradient={gradients.info}
              title="Team Size"
              value={stats.totalUsers}
              subtitle="Active users"
              onClick={onGoToUsers}
            />
          </Grid>
          
          <Grid item xs={6} md={4} lg={2}>
            <InsightCard
              icon={MapPin}
              gradient={gradients.success}
              title="Service Areas"
              value={stats.uniquePincodes}
              subtitle="Unique pincodes"
              onClick={onGoToClients}
            />
          </Grid>
          
          <Grid item xs={6} md={4} lg={2}>
            <InsightCard
              icon={Target}
              gradient={gradients.info}
              title="Density"
              value={clientsPerArea}
              subtitle="Clients per area"
            />
          </Grid>
          
          <Grid item xs={6} md={4} lg={2}>
            <InsightCard
              icon={Activity}
              gradient={gradients.error}
              title="Inactive"
              value={inactiveCount}
              subtitle="Need attention"
              onClick={onGoToClients}
            />
          </Grid>
          
          <Grid item xs={6} md={4} lg={2}>
            <InsightCard
              icon={AlertCircle}
              gradient={gradients.warning}
              title="Missing GPS"
              value={missingGPS}
              subtitle="Need geocoding"
              onClick={onGoToClients}
            />
          </Grid>
          
          <Grid item xs={6} md={4} lg={2}>
            <InsightCard
              icon={Clock}
              gradient={gradients.info}
              title="Total Logs"
              value={`${(stats.totalLogs / 1000).toFixed(1)}K`}
              subtitle="Tracking records"
            />
          </Grid>
        </Grid>
      </VuiBox>

      {/* Action Items */}
      <VuiBox mb={3}>
        <Card>
          <VuiBox mb="20px" display="flex" alignItems="center" gap="12px">
            <VuiBox
              sx={{
                background: linearGradient(gradients.info.main, gradients.info.state),
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Target size={20} color="white" />
            </VuiBox>
            <VuiTypography variant="lg" color="white" fontWeight="bold">
              Action Items
            </VuiTypography>
          </VuiBox>

          <VuiBox display="flex" flexDirection="column" gap="12px">
            {actionItems.map((item, idx) => (
              <VuiBox
                key={idx}
                onClick={onGoToClients}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px",
                  borderRadius: "12px",
                  background: `${item.color}10`,
                  border: `1px solid ${item.color}30`,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "scale(1.01)",
                    background: `${item.color}20`,
                  }
                }}
              >
                <VuiBox
                  sx={{
                    background: linearGradient(item.gradient.main, item.gradient.state),
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <item.icon size={20} color="white" />
                </VuiBox>
                
                <VuiBox flex="1">
                  <VuiTypography variant="button" color="white" fontWeight="bold">
                    {item.title}
                  </VuiTypography>
                  <VuiTypography variant="caption" color="text">
                    {item.action}
                  </VuiTypography>
                </VuiBox>
              </VuiBox>
            ))}
          </VuiBox>
        </Card>
      </VuiBox>

      {/* Charts */}
      <VuiBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <VuiTypography variant="lg" color="white" fontWeight="bold" mb="20px">
                Client Status
              </VuiTypography>
              <VuiBox height="240px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={clientStatusData}
                      dataKey="value"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      strokeWidth={0}
                    >
                      {clientStatusData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(10, 14, 35, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ color: '#fff' }}
                      formatter={(value) => <span style={{ color: '#A0AEC0' }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </VuiBox>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <VuiTypography variant="lg" color="white" fontWeight="bold" mb="20px">
                GPS Coverage
              </VuiTypography>
              <VuiBox height="240px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gpsStatusData}
                      dataKey="value"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      strokeWidth={0}
                    >
                      {gpsStatusData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(10, 14, 35, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ color: '#fff' }}
                      formatter={(value) => <span style={{ color: '#A0AEC0' }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </VuiBox>
            </Card>
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <Card>
              <VuiTypography variant="lg" color="white" fontWeight="bold" mb="20px">
                Top Areas
              </VuiTypography>
              <VuiBox height="240px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topAreasData} layout="vertical">
                    <XAxis type="number" stroke="#4A5568" />
                    <YAxis 
                      type="category" 
                      dataKey="area" 
                      width={80} 
                      stroke="#4A5568"
                      tick={{ fill: '#A0AEC0', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(10, 14, 35, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Bar 
                      dataKey="clients" 
                      fill="url(#barGradient)" 
                      radius={[0, 12, 12, 0]}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0075FF" />
                        <stop offset="100%" stopColor="#21D4FD" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </VuiBox>
            </Card>
          </Grid>
        </Grid>
      </VuiBox>

      {/* Leaderboard */}
      <VuiBox>
        <Card>
          <VuiBox mb="24px" display="flex" alignItems="center" gap="16px">
            <VuiBox
              sx={{
                background: linearGradient(gradients.warning.main, gradients.warning.state),
                width: "54px",
                height: "54px",
                borderRadius: "14px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 8px 24px rgba(251, 185, 71, 0.3)",
              }}
            >
              <Award size={26} color="white" />
            </VuiBox>
            <VuiBox>
              <VuiTypography variant="h4" color="white" fontWeight="bold">
                Top Performers
              </VuiTypography>
              <VuiTypography variant="button" color="text">
                Best team members this month
              </VuiTypography>
            </VuiBox>
          </VuiBox>

          <Grid container spacing={2}>
            {userLeaderboard.slice(0, 5).map((user, idx) => (
              <Grid item xs={6} sm={4} md={2.4} key={idx}>
                <VuiBox
                  onClick={() => {
                    onSelectUser(user);
                    onGoToUsers();
                  }}
                  sx={{
                    padding: "20px",
                    borderRadius: "14px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    background: idx === 0 
                      ? linearGradient("rgba(251, 185, 71, 0.1)", "rgba(251, 185, 71, 0.05)")
                      : "rgba(255, 255, 255, 0.02)",
                    border: idx === 0 
                      ? "2px solid rgba(251, 185, 71, 0.3)"
                      : "1px solid rgba(255, 255, 255, 0.05)",
                    boxShadow: idx === 0 ? "0 8px 24px rgba(251, 185, 71, 0.2)" : "none",
                    "&:hover": {
                      transform: "scale(1.05)",
                      background: idx === 0
                        ? linearGradient("rgba(251, 185, 71, 0.15)", "rgba(251, 185, 71, 0.08)")
                        : "rgba(255, 255, 255, 0.05)",
                    }
                  }}
                >
                  <VuiBox
                    sx={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      margin: "0 auto 16px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: idx === 0
                        ? linearGradient("#FBB947", "#F6AD55")
                        : idx === 1
                        ? linearGradient("#CBD5E0", "#A0AEC0")
                        : idx === 2
                        ? linearGradient("#F6AD55", "#DD6B20")
                        : "rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    <VuiTypography variant="h4" color="white" fontWeight="bold">
                      {idx + 1}
                    </VuiTypography>
                  </VuiBox>

                  <VuiTypography variant="button" color="white" fontWeight="bold" mb="8px">
                    {user.name}
                  </VuiTypography>

                  <VuiTypography variant="h3" color="info" fontWeight="bold" mb="4px">
                    {user.meetings_held}
                  </VuiTypography>
                  <VuiTypography variant="caption" color="text" fontWeight="medium" mb="8px">
                    meetings
                  </VuiTypography>
                  <VuiTypography variant="caption" color="text" sx={{ opacity: 0.6 }}>
                    {user.clients_created} clients
                  </VuiTypography>
                </VuiBox>
              </Grid>
            ))}
          </Grid>
        </Card>
      </VuiBox>
    </VuiBox>
  );
};

export default AnalyticsPage;