import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../lib/axios";

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get("/orders");
				setOrders(response.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<motion.h1
					className="text-3xl font-bold text-emerald-400 mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					My Orders
				</motion.h1>

				{orders.length === 0 ? (
					<motion.div
						className="text-center py-12"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<p className="text-gray-400 text-lg">You haven't placed any orders yet.</p>
					</motion.div>
				) : (
					<div className="space-y-6">
						{orders.map((order) => (
							<motion.div
								key={order._id}
								className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								<div className="p-6">
									<div className="flex justify-between items-start mb-4">
										<div>
											<h3 className="text-lg font-semibold text-emerald-400">
												Order #{order._id.slice(-6).toUpperCase()}
											</h3>
											<p className="text-gray-400 text-sm">
												{formatDate(order.createdAt)}
											</p>
										</div>
										<div className="text-right">
											<p className="text-lg font-semibold text-white">
												${order.totalAmount.toFixed(2)}
											</p>
											<p className="text-sm text-emerald-400">Total Amount</p>
										</div>
									</div>

									<div className="border-t border-gray-700 pt-4">
										<h4 className="text-sm font-medium text-gray-300 mb-3">Order Items:</h4>
										<div className="space-y-3">
											{order.products.map((item) => (
												<div key={item._id} className="flex justify-between items-center">
													<div className="flex items-center space-x-3">
														<img
															src={item.product.image}
															alt={item.product.name}
															className="w-12 h-12 object-cover rounded"
														/>
														<div>
															<p className="text-sm font-medium text-white">
																{item.product.name}
															</p>
															<p className="text-xs text-gray-400">
																Quantity: {item.quantity}
															</p>
														</div>
													</div>
													<p className="text-sm text-gray-300">
														${(item.price * item.quantity).toFixed(2)}
													</p>
												</div>
											))}
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default OrdersPage; 