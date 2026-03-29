output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.app_server.public_ip
}

output "instance_public_dns" {
  description = "Public DNS of the EC2 instance"
  value       = aws_instance.app_server.public_dns
}

output "security_group_id" {
  description = "Security group ID"
  value       = aws_security_group.app_sg.id
}

output "elastic_ip" {
  description = "Elastic IP attached to the EC2 instance"
  value       = aws_eip.app_eip.public_ip
}

output "rds_endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = aws_db_instance.postgres.address
}

output "alb_dns_name" {
  description = "Public DNS name of the ALB"
  value       = aws_lb.app_alb.dns_name
}
