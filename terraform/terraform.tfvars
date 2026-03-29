aws_region    = "us-east-1"
project_name  = "inspireher"
environment   = "dev"
instance_type = "t3.micro"
ami_id        = "ami-0ec10929233384c7f"
key_name      = "ftk"
my_ip_cidr    = "81.228.103.85/32"
/* 78.77.178.59
"194.26.208.65/32" */
db_name     = "inspireherdb"
db_username = "inspireher"
db_password = "Hannahibe39."

vpc_id = "vpc-024e40ed22d550c4c"
public_subnet_ids = [
    "subnet-0fc9dab1c7eca2b93",
    "subnet-088676966f46dd591",
    # "subnet-0dfc57200ef004885",
    # "subnet-054da915db7159e00",
    # "subnet-0f39a3479e569bf5d",
    # "subnet-08c9bcb400b148b97"
]