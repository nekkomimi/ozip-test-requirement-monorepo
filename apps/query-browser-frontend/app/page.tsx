'use client'
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {z} from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {useToast} from "@/components/ui/use-toast"

import {DataTable} from "./data-table";
import {useEffect, useState} from "react";
import {queryRepository} from "@/repository/query";
import {DialogNotification} from "@/components/Dialog/dialog";

export default function Home() {
    const {toast} = useToast();
    const [queryResult, setQueryResult] = useState([]);
    const [query, setQuery] = useState("")
    const [connected, setConnected] = useState(false);
    // const [dialogOpen, setDialogOpen] = useState(false);
    const closeDialog = () => {
        setDialogData(prevState => ({
            ...prevState,
            open: false
        }));
    };

    const [dialogData, setDialogData] = useState({
        open: false,
        title: "",
        description: "",
        onClose: () => closeDialog(),
    });
    const [credential, setCredential] = useState({
        databaseName: "",
        host: "",
        username: "",
        password: "",
    })
    const formSchema = z.object({
        host: z.string().min(1, {
            message: 'Please input database host'
        }),
        databaseName: z.string().min(1, {
            message: 'Please input database name'
        }),
        username: z.string().min(1, {
            message: 'Please input username'
        }),
        password: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            databaseName: "",
            host: "",
            password: ""
        },
    })


    useEffect(() => {

    }, [connected]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (!connected) {
                const resp = await queryRepository.api.testConnection(values);
                if (resp.body.data == "ok" && resp.statusCode === 201) {
                    setConnected(true)
                    setCredential(prevState => values)
                    toast({
                        title: `Database Connected to ${values.host}`
                    })
                }
            } else {
                disconnected();
            }

        } catch (e: any) {
            setDialogData({
                open: true,
                title: "Connection Error",
                description: e.response.body.message,
                onClose: () => closeDialog(),
            });
        }
    }

    async function testConnection() {
        try {
            const values = form.getValues()
            const resp = await queryRepository.api.testConnection(values);
            if (resp.body.data == "ok" && resp.statusCode === 201) {
                setDialogData({
                    open: true,
                    title: "Succeeded",
                    description: "Database connection succeeded",
                    onClose: () => closeDialog(),
                });
            }
        }catch (e: any) {
            setDialogData({
                open: true,
                title: "Connection Error",
                description: e.response.body.message,
                onClose: () => closeDialog(),
            });
            // toast({
            //     title: 'Connection Error',
            //     description: e.response.body.message,
            // })
        }
    }

    async function runQuery() {
        try {
            const resp = await queryRepository.api.runQuery({
                ...credential,
                query,
            })
            if (resp.statusCode == 201) {
                setQueryResult(resp.body.data)
            }
        } catch (e: any) {
            setDialogData({
                open: true,
                title: "Failed to run query",
                description: e.response.body.message,
                onClose: () => closeDialog(),
            });
        }
    }


    function getHeaders(data: any) {
        const headersSet = new Set();

        data.forEach((obj: {}) => {
            const keys = Object.keys(obj);
            keys.forEach(key => headersSet.add(key));
        });

        return Array.from(headersSet);
    }

    const tableHeader = getHeaders(queryResult).map((it: any) => {
        return {
            accessorKey: it,
            header: it.toUpperCase(),
        }
    })

    function disconnected() {
        setConnected(prevState => false)
        toast({
            title: 'Disconnected'
        });
    }
    return (
        <div>
            {dialogData.open && (
                <DialogNotification {...dialogData}/>
            )}
            <div>
                <Card className="m-4">
                    <CardHeader>
                        <CardTitle>Connection</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form className="grid grid-cols-2 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="gap-4">
                                    <FormField control={form.control} name={'host'} render={({field}) => (
                                        <FormItem className={"flex flex-col space-y-1.5 mt-5"}>
                                            <FormLabel>Host</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Database Host"
                                                       className="border p-2 rounded-md" {...field}
                                                       disabled={connected}/>
                                            </FormControl>
                                            <FormMessage></FormMessage>
                                        </FormItem>
                                    )}>
                                    </FormField>
                                    <FormField control={form.control} name={'databaseName'} render={({field}) => (
                                        <FormItem className={"flex flex-col space-y-1.5 mt-5"}>
                                            <FormLabel>Database</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Database Name"
                                                       className="border p-2 rounded-md" {...field}
                                                       disabled={connected}/>
                                            </FormControl>
                                            <FormMessage></FormMessage>

                                        </FormItem>
                                    )}>
                                    </FormField>
                                </div>
                                <div className="gap-4">
                                    <FormField control={form.control} name={'username'} render={({field}) => (
                                        <FormItem className={"flex flex-col space-y-1.5 mt-5"}>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Username"
                                                       className="border p-2 rounded-md" {...field}
                                                       disabled={connected}/>
                                            </FormControl>
                                            <FormMessage></FormMessage>

                                        </FormItem>
                                    )}>
                                    </FormField>
                                    <FormField control={form.control} name={'password'} render={({field}) => (
                                        <FormItem className={"flex flex-col space-y-1.5 mt-5"}>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Password"
                                                       className="border p-2 rounded-md" {...field}
                                                       disabled={connected}/>
                                            </FormControl>
                                            <FormMessage></FormMessage>

                                        </FormItem>
                                    )}>
                                    </FormField>
                                    <div className="flex justify-end gap-4 mt-5">
                                        <Button type={'button'} variant="outline" onClick={testConnection} disabled={connected}>Test Connection</Button>
                                        <Button type={'submit'} className={`${connected ? 'bg-green-500' : ''}`}>{connected ? 'Disconnect' : 'Connect'}</Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                        {/*<div className={"flex justify-end"}><Button type={'button'} className={`bg-green-500`}*/}
                        {/*                                            onClick={disconnected}*/}
                        {/*                                            id={"disconnect"}*/}
                        {/*                                            name={"disconnect"}>Connected</Button></div>*/}
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card className="m-4">
                    <CardHeader>
                        <CardTitle>Query</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div>
                                <Textarea disabled={!connected}
                                          onChange={(value) => setQuery(value.target.value)}></Textarea>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex space-x-4 justify-end">
                        <Button disabled={!connected} onClick={runQuery}>Run</Button>
                    </CardFooter>
                </Card>
            </div>
            <div>
                <Card className="m-4">
                    <CardHeader>
                        <CardTitle>Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={tableHeader} data={queryResult}></DataTable>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
