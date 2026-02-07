import React from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

// @mui material components
import { Card, Grid, Icon, Stack } from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  Speed as SpeedIcon,
  Room as RoomIcon,
  TrackChanges as TrackChangesIcon,
  AccessTime as AccessTimeIcon,
  Error as ErrorIcon,
  EmojiEvents as EmojiEventsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Autorenew as AutorenewIcon,
} from "@mui/icons-material";

// Vision UI Dashboard React components
import VuiBox from "../components/VuiBox";
import VuiTypography from "../components/VuiTypography";

// Vision UI Dashboard React base styles
import colors from "../assets/theme/base/colors";
import linearGradient from "../assets/theme/functions/linearGradient";
import rgba from "../assets/theme/functions/rgba";

const { gradients, info, success, error, warning, grey } = colors;

// Stat Card Component with Vision UI styling
const MiniStatisticsCard = ({ 
  title, 
  count, 
  percentage, 
  icon, 
  onClick 
}) => {
  return (
    <Card 
      sx={{ 
        padding: "32px 28px",
        minHeight: "180px",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": onClick ? { 
          transform: "translateY(-8px)",
          boxShadow: "0 24px 38px 0 rgba(0, 0, 0, 0.12)"
        } : {}
      }}
      onClick={onClick}
    >
      <VuiBox display="flex" flexDirection="column" height="100%">
        <VuiBox display="flex" alignItems="flex-start" mb="auto">
          <VuiBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              background: linearGradient(
                gradients.info.main,
                gradients.info.state
              ),
              borderRadius: "16px",
              width: "64px",
              height: "64px",
              mr: "20px",
              flexShrink: 0,
              boxShadow: "0px 8px 16px rgba(0, 117, 255, 0.3)",
            }}
          >
            {React.cloneElement(icon, { 
              style: { 
                width: '32px', 
                height: '32px',
                color: 'white'
              }
            })}
          </VuiBox>
          
          <VuiBox flex="1">
            <VuiTypography 
              variant="caption" 
              color="text" 
              fontWeight="medium"
              textTransform="uppercase"
              sx={{ 
                fontSize: "11px",
                letterSpacing: "1.2px",
                mb: "8px",
                display: "block"
              }}
            >
              {title}
            </VuiTypography>
            <VuiTypography 
              variant="h2" 
              color="white" 
              fontWeight="bold"
              sx={{ lineHeight: 1.2 }}
            >
              {count}
            </VuiTypography>
          </VuiBox>
        </VuiBox>

        {percentage && (
          <VuiBox display="flex" alignItems="center" mt="20px">
            <VuiTypography 
              variant="button" 
              color={percentage.color} 
              fontWeight="bold"
              mr="6px"
              sx={{ fontSize: "14px" }}
            >
              {percentage.amount}
            </VuiTypography>
            <VuiTypography 
              variant="button" 
              color="text" 
              fontWeight="regular"
              sx={{ fontSize: "13px" }}
            >
              {percentage.label}
            </VuiTypography>
          </VuiBox>
        )}
      </VuiBox>
    </Card>
  );
};

// Info Card Component
const InfoCard = ({ icon, title, value, subtitle, color, onClick }) => (
  <Card 
    sx={{ 
      height: "100%",
      minHeight: "140px",
      padding: "24px 20px",
      cursor: onClick ? "pointer" : "default",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": onClick ? { 
        transform: "translateY(-6px)",
        boxShadow: "0 18px 32px rgba(0, 0, 0, 0.08)"
      } : {}
    }}
    onClick={onClick}
  >
    <VuiBox display="flex" flexDirection="column" height="100%">
      <VuiBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: linearGradient(
            gradients[color].main,
            gradients[color].state
          ),
          borderRadius: "14px",
          width: "56px",
          height: "56px",
          mb: "16px",
          boxShadow: `0 8px 16px ${rgba(gradients[color].main, 0.3)}`,
        }}
      >
        {React.cloneElement(icon, { 
          style: { 
            width: '28px', 
            height: '28px',
            color: 'white'
          }
        })}
      </VuiBox>
      
      <VuiBox flex="1">
        <VuiTypography 
          variant="caption" 
          color="text" 
          fontWeight="medium"
          textTransform="uppercase"
          sx={{ 
            fontSize: "10px",
            letterSpacing: "0.8px",
            mb: "6px",
            display: "block"
          }}
        >
          {title}
        </VuiTypography>
        <VuiTypography 
          variant="h3" 
          color="white" 
          fontWeight="bold"
          sx={{ lineHeight: 1.2, mb: "4px" }}
        >
          {value}
        </VuiTypography>
        {subtitle && (
          <VuiTypography 
            variant="caption" 
            color="text"
            sx={{ fontSize: "11px" }}
          >
            {subtitle}
          </VuiTypography>
        )}
      </VuiBox>
    </VuiBox>
  </Card>
);

// Action Item Card
const ActionItemCard = ({ icon, title, description, color, onClick }) => (
  <VuiBox
    onClick={onClick}
    sx={{
      display: "flex",
      alignItems: "center",
      padding: "20px 24px",
      borderRadius: "16px",
      background: rgba(grey[600], 0.2),
      border: `1px solid ${rgba(grey[600], 0.4)}`,
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      minHeight: "80px",
      "&:hover": {
        background: rgba(grey[600], 0.3),
        transform: "translateX(6px)",
        borderColor: rgba(gradients[color].main, 0.6),
        boxShadow: `0 8px 24px ${rgba(gradients[color].main, 0.2)}`,
      }
    }}
  >
    <VuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: linearGradient(
          gradients[color].main,
          gradients[color].state
        ),
        borderRadius: "14px",
        width: "52px",
        height: "52px",
        mr: "20px",
        flexShrink: 0,
        boxShadow: `0 8px 16px ${rgba(gradients[color].main, 0.3)}`,
      }}
    >
      {React.cloneElement(icon, { 
        style: { 
          width: '26px', 
          height: '26px',
          color: 'white'
        }
      })}
    </VuiBox>
    
    <VuiBox flex="1">
      <VuiTypography 
        variant="button" 
        color="white" 
        fontWeight="bold"
        sx={{ display: "block", mb: "4px", fontSize: "15px" }}
      >
        {title}
      </VuiTypography>
      <VuiTypography 
        variant="caption" 
        color="text"
        sx={{ fontSize: "12px" }}
      >
        {description}
      </VuiTypography>
    </VuiBox>
  </VuiBox>
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

  return (
    <>
      {/* Main Statistics */}
      <div className="mb-6">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <MiniStatisticsCard
              title="Total Clients"
              count={stats.totalClients.toLocaleString()}
              percentage={{
                color: growth >= 0 ? "success" : "error",
                amount: `${Math.abs(growth)}%`,
                label: growth >= 0 ? "increase" : "decrease",
              }}
              icon={<PeopleIcon />}
              onClick={onGoToClients}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} lg={3}>
            <MiniStatisticsCard
              title="Active Rate"
              count={`${conversionRate}%`}
              percentage={{
                color: "success",
                amount: "+2.3%",
                label: "vs last month",
              }}
              icon={<SpeedIcon />}
              onClick={onGoToClients}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} lg={3}>
            <MiniStatisticsCard
              title="GPS Coverage"
              count={`${stats.coordinatesCoverage}%`}
              percentage={{
                color: "success",
                amount: "+5.1%",
                label: "improved",
              }}
              icon={<RoomIcon />}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} lg={3}>
            <MiniStatisticsCard
              title="Total Logs"
              count={`${(stats.totalLogs / 1000).toFixed(1)}K`}
              percentage={{
                color: "info",
                amount: "5.1K",
                label: "tracking records",
              }}
              icon={<AccessTimeIcon />}
            />
          </Grid>
        </Grid>
      </div>

      {/* Quick Stats */}
      <div className="mb-6">
        <Grid container spacing={3}>
          <Grid item xs={6} md={3} lg={2}>
            <InfoCard
              icon={<PeopleIcon />}
              title="Team Size"
              value={stats.totalUsers}
              subtitle="Active users"
              color="info"
              onClick={onGoToUsers}
            />
          </Grid>
          
          <Grid item xs={6} md={3} lg={2}>
            <InfoCard
              icon={<RoomIcon />}
              title="Service Areas"
              value={stats.uniquePincodes}
              subtitle="Unique pincodes"
              color="success"
            />
          </Grid>
          
          <Grid item xs={6} md={3} lg={2}>
            <InfoCard
              icon={<TrackChangesIcon />}
              title="Density"
              value={clientsPerArea}
              subtitle="Clients/area"
              color="info"
            />
          </Grid>
          
          <Grid item xs={6} md={3} lg={2}>
            <InfoCard
              icon={<ErrorIcon />}
              title="Inactive"
              value={inactiveCount}
              subtitle="Need attention"
              color="error"
              onClick={onGoToClients}
            />
          </Grid>
          
          <Grid item xs={6} md={3} lg={2}>
            <InfoCard
              icon={<WarningIcon />}
              title="Missing GPS"
              value={missingGPS}
              subtitle="Need geocoding"
              color="warning"
              onClick={onGoToClients}
            />
          </Grid>
          
          <Grid item xs={6} md={3} lg={2}>
            <InfoCard
              icon={<CheckCircleIcon />}
              title="Coverage"
              value={`${stats.coordinatesCoverage}%`}
              subtitle="GPS data"
              color="success"
            />
          </Grid>
        </Grid>
      </div>

      {/* Action Items */}
      <div className="mb-6">
        <Card sx={{ padding: "32px 28px" }}>
          <VuiBox display="flex" alignItems="center" mb="28px">
            <VuiBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                background: linearGradient(
                  gradients.info.main,
                  gradients.info.state
                ),
                borderRadius: "14px",
                width: "52px",
                height: "52px",
                mr: "16px",
                boxShadow: `0 8px 16px ${rgba(gradients.info.main, 0.3)}`,
              }}
            >
              {React.createElement(TrackChangesIcon, { 
                style: { 
                  width: '26px', 
                  height: '26px',
                  color: 'white'
                }
              })}
            </VuiBox>
            
            <VuiTypography variant="h4" color="white" fontWeight="bold">
              Action Items
            </VuiTypography>
          </VuiBox>

          <Stack spacing={3}>
            {inactiveCount > 0 && (
              <ActionItemCard
                icon={<WarningIcon />}
                title={`${inactiveCount} clients inactive >30 days`}
                description="Review engagement strategy"
                color="error"
                onClick={onGoToClients}
              />
            )}
            
            {missingGPS > 0 && (
              <ActionItemCard
                icon={<RoomIcon />}
                title={`${missingGPS} clients missing GPS`}
                description="Schedule geocoding batch"
                color="warning"
                onClick={onGoToClients}
              />
            )}
            
            <ActionItemCard
              icon={<CheckCircleIcon />}
              title={`${stats.coordinatesCoverage}% GPS coverage`}
              description={stats.coordinatesCoverage > 80 ? "Excellent coverage!" : "Needs improvement"}
              color="success"
            />
          </Stack>
        </Card>
      </div>

      {/* Charts */}
      <div className="mb-6">
        <Grid container spacing={3}>
          {/* Client Status Chart */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ padding: "32px 28px", minHeight: "420px" }}>
              <VuiBox mb="28px">
                <VuiTypography variant="h4" color="white" fontWeight="bold">
                  Client Status
                </VuiTypography>
              </VuiBox>
              
              <VuiBox height="320px" display="flex" alignItems="center" justifyContent="center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={clientStatusData}
                      dataKey="value"
                      innerRadius={85}
                      outerRadius={130}
                      paddingAngle={5}
                      strokeWidth={0}
                    >
                      {clientStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(10, 14, 35, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff',
                        padding: '12px 16px'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '24px' }}
                      formatter={(value) => (
                        <span style={{ color: '#A0AEC0', fontSize: '15px', fontWeight: '500' }}>{value}</span>
                      )}
                      iconSize={12}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </VuiBox>
            </Card>
          </Grid>

          {/* GPS Coverage Chart */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ padding: "32px 28px", minHeight: "420px" }}>
              <VuiBox mb="28px">
                <VuiTypography variant="h4" color="white" fontWeight="bold">
                  GPS Coverage
                </VuiTypography>
              </VuiBox>
              
              <VuiBox height="320px" display="flex" alignItems="center" justifyContent="center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gpsStatusData}
                      dataKey="value"
                      innerRadius={85}
                      outerRadius={130}
                      paddingAngle={5}
                      strokeWidth={0}
                    >
                      {gpsStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(10, 14, 35, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff',
                        padding: '12px 16px'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '24px' }}
                      formatter={(value) => (
                        <span style={{ color: '#A0AEC0', fontSize: '15px', fontWeight: '500' }}>{value}</span>
                      )}
                      iconSize={12}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </VuiBox>
            </Card>
          </Grid>

          {/* Top Areas Chart */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ padding: "32px 28px", minHeight: "420px" }}>
              <VuiBox mb="28px">
                <VuiTypography variant="h4" color="white" fontWeight="bold">
                  Top Areas
                </VuiTypography>
              </VuiBox>
              
              <VuiBox height="320px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topAreasData} layout="vertical" margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
                    <XAxis 
                      type="number" 
                      stroke="#4A5568"
                      tick={{ fill: '#A0AEC0', fontSize: 12 }}
                      axisLine={{ stroke: '#4A5568' }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="area" 
                      width={100} 
                      stroke="#4A5568"
                      tick={{ fill: '#A0AEC0', fontSize: 13, fontWeight: '500' }}
                      axisLine={{ stroke: '#4A5568' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(10, 14, 35, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff',
                        padding: '12px 16px'
                      }}
                      cursor={{ fill: 'rgba(0, 117, 255, 0.1)' }}
                    />
                    <Bar 
                      dataKey="clients" 
                      fill="url(#barGradient)" 
                      radius={[0, 20, 20, 0]}
                      barSize={20}
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
      </div>

      {/* Leaderboard */}
      <div>
        <Card sx={{ padding: "32px 28px" }}>
          <VuiBox display="flex" alignItems="center" mb="40px">
            <VuiBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                background: linearGradient(
                  gradients.warning.main,
                  gradients.warning.state
                ),
                borderRadius: "16px",
                width: "64px",
                height: "64px",
                mr: "20px",
                boxShadow: `0 8px 20px ${rgba(gradients.warning.main, 0.4)}`,
              }}
            >
              {React.createElement(EmojiEventsIcon, { 
                style: { 
                  width: '32px', 
                  height: '32px',
                  color: 'white'
                }
              })}
            </VuiBox>
            
            <VuiBox>
              <VuiTypography variant="h3" color="white" fontWeight="bold" mb="4px">
                Top Performers
              </VuiTypography>
              <VuiTypography variant="button" color="text" fontWeight="regular">
                Best team members this month
              </VuiTypography>
            </VuiBox>
          </VuiBox>

          <Grid container spacing={3}>
            {userLeaderboard.slice(0, 5).map((user, idx) => {
              const isTop = idx === 0;
              const gradientColor = idx === 0 
                ? gradients.warning 
                : idx === 1 
                ? gradients.dark 
                : gradients.info;

              return (
                <Grid item xs={6} sm={4} md={2.4} key={idx}>
                  <VuiBox
                    onClick={() => {
                      onSelectUser(user);
                      onGoToUsers();
                    }}
                    sx={{
                      padding: "24px 16px",
                      borderRadius: "15px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      background: isTop 
                        ? rgba(gradientColor.main, 0.1)
                        : rgba(grey[600], 0.2),
                      border: `1px solid ${isTop 
                        ? rgba(gradientColor.main, 0.3)
                        : rgba(grey[600], 0.3)}`,
                      boxShadow: isTop ? `0 8px 24px ${rgba(gradientColor.main, 0.2)}` : "none",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        background: isTop
                          ? rgba(gradientColor.main, 0.15)
                          : rgba(grey[600], 0.3),
                      }
                    }}
                  >
                    <VuiBox
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        margin: "0 auto 16px",
                        background: linearGradient(
                          gradientColor.main,
                          gradientColor.state
                        ),
                        boxShadow: `0 4px 20px ${rgba(gradientColor.main, 0.4)}`,
                      }}
                    >
                      <VuiTypography variant="h3" color="white" fontWeight="bold">
                        {idx + 1}
                      </VuiTypography>
                    </VuiBox>

                    <VuiTypography 
                      variant="button" 
                      color="white" 
                      fontWeight="bold" 
                      mb="8px"
                      sx={{ display: "block" }}
                    >
                      {user.name}
                    </VuiTypography>

                    <VuiTypography 
                      variant="h3" 
                      color="info" 
                      fontWeight="bold" 
                      mb="4px"
                    >
                      {user.meetings_held}
                    </VuiTypography>
                    
                    <VuiTypography 
                      variant="caption" 
                      color="text" 
                      fontWeight="medium" 
                      mb="8px"
                      sx={{ display: "block" }}
                    >
                      meetings
                    </VuiTypography>
                    
                    <VuiTypography 
                      variant="caption" 
                      color="text" 
                      sx={{ opacity: 0.6 }}
                    >
                      {user.clients_created} clients
                    </VuiTypography>
                  </VuiBox>
                </Grid>
              );
            })}
          </Grid>
        </Card>
      </div>
    </>
  );
};

export default AnalyticsPage;