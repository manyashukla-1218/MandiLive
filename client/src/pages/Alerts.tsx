import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAlerts, useCreateAlert, useDeleteAlert } from "@/hooks/use-alerts";
import { insertAlertSchema, type InsertAlert } from "@shared/schema";
import { mockCommodities, mockMandis } from "@/data/mockData";
import { Bell, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Alerts() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: alerts, isLoading } = useAlerts();
  const createAlert = useCreateAlert();
  const deleteAlert = useDeleteAlert();

  const form = useForm<InsertAlert>({
    resolver: zodResolver(insertAlertSchema),
    defaultValues: {
      targetPrice: 0,
      condition: "Above",
    },
  });

  const onSubmit = (data: InsertAlert) => {
    createAlert.mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      },
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-display">Price Alerts</h1>
          <p className="text-muted-foreground mt-2">Get notified when prices reach your target.</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl shadow-lg shadow-primary/20">
              <Plus className="mr-2 h-4 w-4" /> Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Create Price Alert</DialogTitle>
              <DialogDescription>
                We'll notify you when the market price meets your condition.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="commodityId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commodity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select commodity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockCommodities.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mandiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mandi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mandi" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockMandis.map((m) => (
                            <SelectItem key={m.id} value={m.id}>
                              {m.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Above">Above</SelectItem>
                            <SelectItem value="Below">Below</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Price (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full mt-4" disabled={createAlert.isPending}>
                  {createAlert.isPending ? "Creating..." : "Set Alert"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-10 text-center text-muted-foreground">Loading alerts...</div>
        ) : alerts?.length === 0 ? (
          <div className="col-span-full bg-muted/30 rounded-2xl p-10 text-center border border-dashed">
             <Bell className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
             <h3 className="text-lg font-bold">No Alerts Yet</h3>
             <p className="text-muted-foreground mb-6">Create your first alert to track commodity prices.</p>
             <Button variant="outline" onClick={() => setIsOpen(true)}>Create Alert</Button>
          </div>
        ) : (
          <AnimatePresence>
            {alerts?.map((alert) => {
              const commodity = mockCommodities.find(c => c.id === alert.commodityId);
              const mandi = mockMandis.find(m => m.id === alert.mandiId);

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                >
                  <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg text-xl">
                            {commodity?.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{commodity?.name}</CardTitle>
                            <CardDescription>{mandi?.name}</CardDescription>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-destructive -mr-2 -mt-2"
                          onClick={() => deleteAlert.mutate(alert.id)}
                          disabled={deleteAlert.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mt-2 pt-4 border-t">
                        <div className="text-sm font-medium text-muted-foreground">Condition</div>
                        <div className="flex items-center gap-2">
                           <span className={`px-2 py-1 rounded text-xs font-bold ${alert.condition === 'Above' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {alert.condition}
                           </span>
                           <span className="font-bold text-lg">₹{alert.targetPrice}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
