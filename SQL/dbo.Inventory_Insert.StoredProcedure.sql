USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Inventory_Insert]    Script Date: 11/23/2022 3:33:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Gideon Macapagal
-- Create date: November 16 2022
-- Description: Add record to dbo.Inventory
-- Code Reviewer: Victoria Sanchez

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- =============================================

CREATE PROC [dbo].[Inventory_Insert]
		   @ProductId int
		   ,@UserId int
		   ,@Quantity int
		   ,@IsActive bit
		   ,@BasePrice decimal(18, 2)
		   ,@Id int OUTPUT

AS

/*
--------- TEST CODE ----------
DECLARE @ProductId int = 25
        ,@UserId int = 75
        ,@Quantity int = 3
	,@IsActive bit = 1
	,@BasePrice decimal(18, 2) = 25.98
	,@Id int = 0

EXECUTE dbo.Inventory_Insert 
		@ProductId
		,@UserId 
		,@Quantity
		,@IsActive
		,@BasePrice
		,@Id OUTPUT

SELECT *
FROM dbo.Inventory
WHERE Id = @Id

*/

BEGIN

INSERT INTO [dbo].[Inventory]
           ([ProductId]
	   ,[VetId]
           ,[Quantity]
	   ,[IsActive]
	   ,[BasePrice]
           ,[CreatedBy]
           ,[ModifiedBy])

VALUES (@ProductId
	,@UserId
	,@Quantity
	,@IsActive
	,@BasePrice
	,@UserId
	,@UserId)

SET @Id = SCOPE_IDENTITY()

END
GO
